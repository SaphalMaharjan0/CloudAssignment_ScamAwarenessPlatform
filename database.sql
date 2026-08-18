-- FraudGuard Database Schema

-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Reporter' CHECK (role IN ('Reporter', 'Moderator', 'Admin')),
    status VARCHAR(50) DEFAULT 'Active' CHECK (status IN ('Active', 'Suspended', 'Inactive')),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table (for Reports and Articles)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Scam Reports Table
CREATE TABLE scam_reports (
    id VARCHAR(50) PRIMARY KEY, -- e.g., RPT-2024-0904
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    reporter_id INTEGER REFERENCES users(id),
    priority VARCHAR(50) DEFAULT 'Medium' CHECK (priority IN ('Low', 'Medium', 'High')),
    status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'Verified', 'Rejected')),
    scammer_details TEXT, -- JSON or Text containing known details (phone, email, etc.)
    financial_loss DECIMAL(15, 2) DEFAULT 0.00,
    platform_used VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Report Evidence (Images/Files)
CREATE TABLE report_evidence (
    id SERIAL PRIMARY KEY,
    report_id VARCHAR(50) REFERENCES scam_reports(id) ON DELETE CASCADE,
    file_url VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles / Knowledge Base Table
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    author_id INTEGER REFERENCES users(id),
    cover_image_url VARCHAR(255),
    views_count INTEGER DEFAULT 0,
    read_time_minutes INTEGER DEFAULT 5,
    status VARCHAR(50) DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published', 'Archived')),
    published_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications Table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'info' CHECK (type IN ('info', 'alert', 'success', 'warning')),
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Platform Settings (Key-Value store for global configs)
CREATE TABLE platform_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT,
    description VARCHAR(255),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by INTEGER REFERENCES users(id)
);

-- Initial Data Seeding

INSERT INTO categories (name) VALUES 
('Phishing'), 
('Investment Scam'), 
('Fake Website'), 
('Banking Scam'), 
('Social Media Scam'), 
('Fake Job'), 
('SMS Scam');

-- Insert initial Admin user (password should be hashed in production)
INSERT INTO users (name, email, password_hash, role, is_verified) 
VALUES ('System Admin', 'admin@FraudGuard.gov.ph', 'hashed_password_here', 'Admin', TRUE);

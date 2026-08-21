# AWS Deployment Guide: FraudGuard

This guide covers the step-by-step deployment of the FraudGuard Spring Boot + React bundled application to AWS, specifically designed to fit within the AWS Free Tier for your university assignment.

---

## 1. Local Build & Packaging

Before deploying, you must package the application into a single `.jar` file. 

1. Ensure you have Node.js and Maven installed locally.
2. Open a terminal in the root directory.
3. Run the provided build script:
   ```bash
   ./build-and-deploy.sh
   ```
   *Note for Windows users:* If you cannot run `.sh` files, simply execute these commands manually:
   ```powershell
   cd frontend
   npm install
   npm run build
   cd ../backend
   mvn clean package -DskipTests
   ```
4. **Locate the JAR**: The deployable file will be generated at `backend/target/backend-0.0.1-SNAPSHOT.jar`.

---

## 2. Amazon RDS (PostgreSQL) Setup

1. Log into the AWS Management Console and navigate to **RDS**.
2. Click **Create database**.
3. Choose **Standard create**.
4. Engine options: Select **PostgreSQL**.
5. Templates: Select **Free tier**.
6. Settings:
   - DB instance identifier: `FraudGuard-db`
   - Master username: `postgres`
   - Master password: `<Choose a secure password>`
7. Instance configuration: `db.t3.micro` or `db.t2.micro`.
8. Storage: 20 GiB General Purpose SSD (gp2).
9. Connectivity:
   - Virtual private cloud (VPC): Default VPC
   - Public access: **No** (Security best practice: only EB should access it).
   - VPC security group: Create new (name it `rds-sg`).
10. Database options (under Additional configuration):
    - Initial database name: `FraudGuard` (Important: Do not skip this, Spring Boot expects this DB to exist).
11. Click **Create database**.

> 📸 **Screenshot Opportunity (Report):** Take a screenshot of the "Databases" list showing your newly created RDS instance in the "Available" state.

---

## 3. AWS Elastic Beanstalk (Spring Boot) Setup

1. Navigate to **Elastic Beanstalk** in the AWS Console.
2. Click **Create application**.
3. Application Name: `FraudGuardApp`
4. Platform: 
   - Platform type: **Managed platform**
   - Platform: **Java**
   - Platform branch: **Corretto 17** (or matching your Java version).
5. Application code:
   - Select **Upload your code**.
   - Choose file: Upload the `backend-0.0.1-SNAPSHOT.jar` you generated in Step 1.
6. Click **Configure more options** (or Next, depending on the console version) to set up properties BEFORE creating the environment.
7. **Environment Properties**: 
   Navigate to the "Environment properties" section and add the following keys (refer to your `.env.example` file):
   - `SERVER_PORT` = `5000` (Crucial: EB routes traffic to port 5000 by default for Java)
   - `SPRING_PROFILES_ACTIVE` = `prod`
   - `RDS_HOSTNAME` = `<Your RDS Endpoint copied from the RDS console>`
   - `RDS_PORT` = `5432`
   - `RDS_DB_NAME` = `FraudGuard`
   - `RDS_USERNAME` = `postgres`
   - `RDS_PASSWORD` = `<Your RDS Master Password>`
   - `JWT_SECRET` = `<Your base64 JWT Secret>`
8. **Create Environment**: Complete the wizard to launch the environment. It will take a few minutes.

> 📸 **Screenshot Opportunity (Report):** Take a screenshot of the Elastic Beanstalk Environment configuration page showing the Environment Properties (RDS connection variables) being injected.

---

## 4. Security Group Configuration (Crucial for DB Connectivity)

By default, Elastic Beanstalk might not be able to talk to your RDS database if they are in different security groups.

1. Go to the **EC2 Dashboard** -> **Security Groups**.
2. Find the Security Group automatically created for your Elastic Beanstalk environment (usually named something like `awseb-e-...`). Copy its Security Group ID (e.g., `sg-0abc123...`).
3. Find the Security Group you created for RDS (`rds-sg`).
4. Edit the **Inbound rules** of the `rds-sg`:
   - Add a rule: Type: `PostgreSQL`, Protocol: `TCP`, Port: `5432`, Source: `Custom` -> Paste the Elastic Beanstalk Security Group ID (`sg-0abc123...`).
5. Save the rules.

> 📸 **Screenshot Opportunity (Report):** Take a screenshot of this specific inbound rule on the RDS Security Group to demonstrate your understanding of AWS Networking and Security (highly favored by professors!).

---

## 5. Verification & Video Demo Checklist

Once the Elastic Beanstalk environment turns green (Health: OK), your app is live!

### Endpoints to demonstrate in your 20-minute video:

1. **Frontend App**: Visit the EB provided URL (e.g., `http://FraudGuard-env.eba-xxxx.region.elasticbeanstalk.com/`). Since we bundled the React app, the UI will load directly from the root URL.
2. **Health Check**: Visit `http://<EB-URL>/actuator/health`. This proves the Spring Boot Actuator is running and AWS can monitor instance health.
3. **Database Test (CRUD)**:
   - Use Postman or the frontend UI (once connected) to make a `POST` request to `/api/categories` to create a Scam Category.
   - Make a `GET` request to `/api/categories` to retrieve the data. This proves end-to-end connectivity from the Internet -> EB -> RDS.

> 📸 **Screenshot Opportunity (Report):** Take a screenshot of the live website, the `/actuator/health` JSON response, and a successful GET request returning data from the database.

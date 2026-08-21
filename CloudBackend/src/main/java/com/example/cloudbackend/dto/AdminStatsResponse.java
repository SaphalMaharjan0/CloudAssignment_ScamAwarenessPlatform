package com.example.cloudbackend.dto;

import com.example.cloudbackend.entity.ScamReport;
import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class AdminStatsResponse {
    private long totalUsers;
    private long totalReports;
    private long pendingReports;
    private long verifiedReports;
    private List<ScamReport> latestPendingReports;
    private List<Map<String, Object>> reportData;
    private List<Map<String, Object>> userGrowthData;
}

import PDFDocument from "pdfkit";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class ReportService {
  /**
   * Generate monthly employee report PDF
   */
  async generateMonthlyReport(employeeData, attendanceRecords, leaveRecords, year, month) {
    return new Promise((resolve, reject) => {
      try {
        const doc = new PDFDocument({ margin: 50 });
        const chunks = [];

        // Collect PDF data
        doc.on("data", (chunk) => chunks.push(chunk));
        doc.on("end", () => resolve(Buffer.concat(chunks)));
        doc.on("error", reject);

        const monthName = new Date(year, month - 1).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        });

        // Header
        doc
          .fontSize(24)
          .fillColor("#7147a0")
          .text("Employee Monthly Report", { align: "center" })
          .moveDown(0.5);

        doc
          .fontSize(14)
          .fillColor("#666666")
          .text(monthName, { align: "center" })
          .moveDown(1);

        // Employee Details Section
        doc
          .fontSize(16)
          .fillColor("#3e74c3")
          .text("Employee Information", { underline: true })
          .moveDown(0.5);

        doc.fontSize(12).fillColor("#000000");
        const details = [
          `Name: ${employeeData.first_name} ${employeeData.last_name}`,
          `Employee ID: ${employeeData.id}`,
          `Position: ${employeeData.position}`,
          `Department: ${employeeData.department || "N/A"}`,
          `Email: ${employeeData.email}`,
          `Phone: ${employeeData.phone || "N/A"}`,
          `Status: ${employeeData.status}`,
        ];

        details.forEach((detail) => {
          doc.text(detail);
        });

        doc.moveDown(1.5);

        // Attendance Summary Section
        doc
          .fontSize(16)
          .fillColor("#3e74c3")
          .text("Attendance Summary", { underline: true })
          .moveDown(0.5);

        doc.fontSize(12).fillColor("#000000");

        const presentCount = attendanceRecords.filter(
          (r) => r.status === "present"
        ).length;
        const absentCount = attendanceRecords.filter(
          (r) => r.status === "absent"
        ).length;
        const halfDayCount = attendanceRecords.filter(
          (r) => r.status === "half_day"
        ).length;
        const lateCount = attendanceRecords.filter(
          (r) => r.status === "late"
        ).length;

        const totalWorkingDays = this.calculateWorkingDays(year, month);

        doc.text(`Total Working Days: ${totalWorkingDays}`);
        doc.text(`Days Present: ${presentCount}`);
        doc.text(`Days Absent: ${absentCount}`);
        doc.text(`Half Days: ${halfDayCount}`);
        doc.text(`Late Arrivals: ${lateCount}`);
        doc.text(
          `Attendance Rate: ${
            totalWorkingDays > 0
              ? ((presentCount / totalWorkingDays) * 100).toFixed(2)
              : 0
          }%`
        );

        doc.moveDown(1.5);

        // Leave Records Section
        doc
          .fontSize(16)
          .fillColor("#3e74c3")
          .text("Leave Records", { underline: true })
          .moveDown(0.5);

        doc.fontSize(12).fillColor("#000000");

        if (leaveRecords.length === 0) {
          doc.text("No leave records for this month.");
        } else {
          leaveRecords.forEach((leave, index) => {
            doc.text(`${index + 1}. Leave Type: ${leave.leave_type.toUpperCase()}`);
            doc.text(
              `   Duration: ${new Date(leave.start_date).toLocaleDateString()} - ${new Date(
                leave.end_date
              ).toLocaleDateString()}`
            );
            doc.text(`   Status: ${leave.status.toUpperCase()}`);
            doc.text(`   Reason: ${leave.reason}`);
            doc.moveDown(0.5);
          });

          const totalLeaveDays = leaveRecords.reduce((total, leave) => {
            const start = new Date(leave.start_date);
            const end = new Date(leave.end_date);
            const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
            return total + days;
          }, 0);

          doc.moveDown(0.5);
          doc.text(`Total Leave Days: ${totalLeaveDays}`);
        }

        doc.moveDown(1.5);

        // Attendance Details Table
        if (attendanceRecords.length > 0) {
          doc
            .fontSize(16)
            .fillColor("#3e74c3")
            .text("Daily Attendance Records", { underline: true })
            .moveDown(0.5);

          doc.fontSize(10).fillColor("#000000");

          // Table header
          const tableTop = doc.y;
          const dateX = 50;
          const statusX = 150;
          const checkInX = 250;
          const checkOutX = 350;

          doc
            .fontSize(10)
            .fillColor("#7147a0")
            .text("Date", dateX, tableTop, { bold: true })
            .text("Status", statusX, tableTop, { bold: true })
            .text("Check In", checkInX, tableTop, { bold: true })
            .text("Check Out", checkOutX, tableTop, { bold: true });

          doc.moveDown(0.5);

          // Table rows
          attendanceRecords
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .forEach((record) => {
              const y = doc.y;

              // Check if we need a new page
              if (y > 700) {
                doc.addPage();
              }

              doc
                .fontSize(9)
                .fillColor("#000000")
                .text(
                  new Date(record.date).toLocaleDateString(),
                  dateX,
                  doc.y
                )
                .text(record.status.toUpperCase(), statusX, y)
                .text(record.check_in_time || "-", checkInX, y)
                .text(record.check_out_time || "-", checkOutX, y);

              doc.moveDown(0.3);
            });
        }

        // Footer
        doc.moveDown(2);
        const footerY = doc.page.height - 100;
        if (doc.y < footerY) {
          doc.y = footerY;
        }

        doc
          .fontSize(8)
          .fillColor("#999999")
          .text(
            `Report Generated: ${new Date().toLocaleString()}`,
            50,
            doc.page.height - 50,
            { align: "center" }
          );

        doc.end();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Calculate working days (weekdays) in a month
   */
  calculateWorkingDays(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();
    let workingDays = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day);
      const dayOfWeek = date.getDay();
      // Count only weekdays (Monday-Friday)
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workingDays++;
      }
    }

    return workingDays;
  }
}

export default new ReportService();

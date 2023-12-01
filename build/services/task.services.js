import { getClientByTenantId } from "../config/db.js";
export class TaskService {
    static taskFlagTPICalculation(actualProgress, taskDuration, durationSpentToDate) {
        const plannedProgress = durationSpentToDate / taskDuration;
        const tpi = actualProgress / plannedProgress;
        if (tpi < 0.8) {
            return 'Red';
        }
        else if (tpi >= 0.8 && tpi < 0.95) {
            return 'Orange';
        }
        else {
            return 'Green';
        }
    }
    ;
    static calculateTaskEndDate(startDate, durationDays) {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + durationDays);
        return endDate;
    }
    ;
    static async calculateSubTask(startingTaskId, tanentId) {
        let currentTaskId = startingTaskId;
        let count = 0;
        const prisma = await getClientByTenantId(tanentId);
        const parentTasks = await prisma.task.findMany();
        while (currentTaskId) {
            const currentTask = parentTasks.find(task => task.taskId === currentTaskId);
            if (currentTask) {
                count += 1;
                currentTaskId = currentTask.parentTaskId;
            }
            else {
                break;
            }
        }
        return count;
    }
    ;
}
;

/**
 * Wraps Controllers for easy import from other modules
 */
import { DepartmentRespository } from "../repository/departmentRepository";
import { EmployeeRespository } from "../repository/employeeRepository";
import { DepartmentService } from "../service/departmentService";
import { EmployeeService } from "../service/employeeService";
import DepartmentController from "./DepartmentController";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
  new DepartmentController(new DepartmentService(new DepartmentRespository())),
];

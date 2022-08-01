/**
 * Wraps Controllers for easy import from other modules
 */
import { EmployeeRespository } from "../repository/employeeRepository";
import { EmployeeService } from "../service/employeeService";
import EmployeeController from "./EmployeeController";
import HealthController from "./HealthController";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository())),
];

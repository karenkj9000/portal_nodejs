import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/employeeService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateEmployeeDto } from "../dto/createEmployeeDto";
import { UpdateEmployeeDto } from "../dto/updateEmployeeDto";
import { UpdateEmployeeByParamsDto } from "../dto/updateEmployeeByParamsDto";
import { DeleteEmployeeByParamsDto } from "../dto/deleteEmployeeByParamsDto";
import { GetEmployeeByParamsDto } from "../dto/getEmployeeByParams";
import authorize from "../middleware/authorize";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(
      `${this.path}`,
      /*authorize(["Developer"]),*/ this.getEmployee
    );
    this.router.get(
      `${this.path}/:id`,
      validationMiddleware(GetEmployeeByParamsDto, APP_CONSTANTS.params),
      this.getEmployeeById // params validated
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UpdateEmployeeByParamsDto, APP_CONSTANTS.params),
      validationMiddleware(UpdateEmployeeDto, APP_CONSTANTS.body),
      this.updateEmployeeById // params,body validated
    );
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(DeleteEmployeeByParamsDto, APP_CONSTANTS.params),
      this.deleteEmployeeById // params validated
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createEmployee)
      this.createEmployee // body validated
    );
    this.router.post(`${this.path}/login`, this.login);
  }
  private getEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private updateEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.updateEmployeeById(
        request.params.id,
        request.body
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private deleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.softDeleteEmployeeById(
        request.params.id
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      // console.log(request.body);
      const data = await this.employeeService.createEmployee(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  };

  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const loginData = request.body;
      const loginDetail = await this.employeeService.employeeLogin(
        loginData.username,
        loginData.password
      );
      response.send(
        this.fmt.formatResponse(
          loginDetail,
          Date.now() - request.startTime,
          "OK"
        )
      );
    } catch (err) {
      next(err);
    }
  };
}

export default EmployeeController;

import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/departmentService";
import validationMiddleware from "../middleware/validationMiddleware";
import { CreateDepartmentDto } from "../dto/createDepartmentDto";
import { UpdateDepartmentByParamsDto } from "../dto/updateDepartmentByParamsDto";
import { UpdateDepartmentDto } from "../dto/updateDepartmentDto";
import { GetDepartmentByParamsDto } from "../dto/getDepartmentByParamsDto";
import { DeleteDepartmentByParamsDto } from "../dto/deleteDepartmentByParamsDto";
import App from "../app";

class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`, this.getDepartment);
    this.router.get(
      `${this.path}/:id`,
      validationMiddleware(GetDepartmentByParamsDto, APP_CONSTANTS.params),
      this.getDepartmentById // params validated
    );
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(UpdateDepartmentByParamsDto, APP_CONSTANTS.params),
      validationMiddleware(UpdateDepartmentDto, APP_CONSTANTS.body),
      this.updateDepartmentById // params,body validated
    );
    this.router.delete(
      `${this.path}/:id`,
      validationMiddleware(DeleteDepartmentByParamsDto, APP_CONSTANTS.params),
      this.deleteDepartmentById // params validated
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body),
      // this.asyncRouteHandler(this.createDepartment)
      this.createDepartment // body validated
    );
  }
  private getDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.getAllDepartments();
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private getDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.getDepartmentById(
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

  private updateDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.updateDepartmentById(
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

  private deleteDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.softDeleteDepartmentById(
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

  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data = await this.departmentService.createDepartment(request.body);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK")
      );
    } catch (err) {
      next(err);
    }
  };
}

export default DepartmentController;

import { Router } from "express"; // Import Router from Express

// Interface for defining router structure
interface IRouter {
  routes(): void; // Method to define routes
}

// Abstract class for base router
abstract class BaseRoutes implements IRouter {
  public router: Router; // Router instance
  constructor() {
    this.router = Router(); // Router instance
    this.routes(); // Call the routes method
  }
  abstract routes(): void; // Abstract method to be implemented
}

export default BaseRoutes;

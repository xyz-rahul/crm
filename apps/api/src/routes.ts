import express from 'express';
import { UserController } from './controller/user'
import { LeadController } from './controller/lead'
import { CustomerController } from './controller/customer'
import { AuthController } from './controller/auth';
import { search } from './controller/search';

const router = express.Router() as express.Router;

function AuthMiddleware(roles: string[] = []) {
    return function(req: express.Request, res: express.Response, next: express.NextFunction) {
        const role = req.session.user?.role!;
        if (!roles || roles.length === 0) next();
        else if (roles.includes(role) || role === 'admin') next();
        else res.status(401).json({ message: "Access Denied" });
    }
}

router.post('/auth/signup', AuthController.signUpAsManager);
router.post('/auth/login', AuthController.login);
router.get('/auth/isLoggedIn', AuthController.isLoggedIn);
router.get('/auth/logout', AuthController.logout);

// User Routes
router.post('/user/agent', AuthMiddleware(['manager']), UserController.createAgent);
router.get('/user', AuthMiddleware(['manager']), UserController.getAllUsers);
router.get('/user/:id', AuthMiddleware(['manager', 'agent']), UserController.getUserById);
router.put('/user/:id', AuthMiddleware(['manager', 'agent']), UserController.updateUser);
router.delete('/user/:id', AuthMiddleware(['manager']), UserController.deleteUser);

// Lead Routes
router.post('/lead', AuthMiddleware(['manager', 'agent']), LeadController.createLead);
router.get('/lead', AuthMiddleware(['manager', 'agent']), LeadController.getAllLeads);
router.get('/lead/:id', AuthMiddleware(['manager', 'agent']), LeadController.getLeadById);
router.put('/lead/:id', AuthMiddleware(['manager', 'agent']), LeadController.updateLead);
router.delete('/lead/:id', AuthMiddleware(['manager', 'agent']), LeadController.deleteLead);
router.get('/report/lead', AuthMiddleware(['manager', 'agent']), LeadController.getReport);

// Customer Routes
router.post('/customer', AuthMiddleware(['manager', 'agent']), CustomerController.createCustomer);
router.get('/customer', AuthMiddleware(['manager', 'agent']), CustomerController.getAllCustomers);
router.get('/customer/:id', AuthMiddleware(['manager', 'agent']), CustomerController.getCustomerById);
router.put('/customer/:id', AuthMiddleware(['manager', 'agent']), CustomerController.updateCustomer);
router.delete('/customer/:id', AuthMiddleware(['manager', 'agent']), CustomerController.deleteCustomer);

router.get('/search/:key', AuthMiddleware(['manager', 'agent']),search);
export default router;


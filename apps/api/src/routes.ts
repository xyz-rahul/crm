import express from 'express';
import { UserController } from './controller/user'
import { LeadController } from './controller/lead'
import { CustomerController } from './controller/customer'
import { AuthController } from './controller/auth';

const router = express.Router() as express.Router;


router.post('/auth/signup', AuthController.signUpAsManager);
// User Routes
// router.post('/user', UserController.createUser);
router.post('/user/manager', UserController.createManager);
router.post('/user/agent', UserController.createAgent);
router.get('/user', UserController.getAllUsers);
router.get('/user/:id', UserController.getUserById);
router.put('/user/:id', UserController.updateUser);
router.delete('/user/:id', UserController.deleteUser);

// Lead Routes
router.post('/lead', LeadController.createLead);
router.get('/lead', LeadController.getAllLeads);
router.get('/lead/:id', LeadController.getLeadById);
router.put('/lead/:id', LeadController.updateLead);
router.delete('/lead/:id', LeadController.deleteLead);

// Customer Routes
router.post('/customer', CustomerController.createCustomer);
router.get('/customer', CustomerController.getAllCustomers);
router.get('/customer/:id', CustomerController.getCustomerById);
router.put('/customer/:id', CustomerController.updateCustomer);
router.delete('/customer/:id', CustomerController.deleteCustomer);

export default router;


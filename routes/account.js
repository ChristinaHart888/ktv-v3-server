require('dotenv').config();
const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

const resend = new Resend(process.env.KTV3_API_KEY);

// Middleware for parsing JSON and URL-encoded bodies
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// Account Routes
router.get('/user', (req, res) => {
  // 1. Get userId from query parameters
  // 2. Fetch user data from database based on userId
  // 3. Handle errors (e.g., user not found)
  res.json({ message: 'Account endpoint' });
});

router.get('/users', (req, res) => {
  // 1. Check user permissions (e.g., admin access)
  // 2. Fetch all users from database
  // 3. Handle errors (e.g., database connection issues)
  res.json({ message: 'All accounts endpoint' });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  //Handle login logic here (e.g., authenticate user)
  //1. Validate input data
  //    a. Check for required fields (e.g., email, password)
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  //2. Fetch user from database based on email

  //3. Compare hashed password
  //4. Generate authentication token (e.g., JWT)
  //5a. Handle errors (e.g., invalid credentials, user not found)
  //5b. Return success response with token
  res.json({ message: 'Login endpoint', email, password });
});

router.post('/user', async (req, res) => {
  const accountData = req.body;
  //Handle account creation logic here (e.g., save to database)
  //1. Validate input data
  //    a. Check for required fields (e.g., username, password, email)
  if (!accountData.username || !accountData.password || !accountData.email) {
    return res.status(400).json({ message: 'Username, password, and email are required' });
  }
  //    b. Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(accountData.email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  try {
    const userCredentials = await auth.createUserWithEmailAndPassword(accountData.email, accountData.password);
    return res.json({ message: 'Account created', userId: userCredentials.user.uid });
  } catch (error) {
    console.error('Error creating user:', error);
    switch (error.code) {
      case 'auth/email-already-in-use':
        return res.status(409).json({ message: 'Email already in use' });
      case 'auth/invalid-email':
        return res.status(400).json({ message: 'Invalid email' });
      case 'auth/operation-not-allowed':
        return res.status(403).json({ message: 'Operation not allowed' });
      case 'auth/weak-password':
        return res.status(400).json({ message: 'Weak password' });
      default:
        return res.status(500).json({ message: 'Error creating user' });
    }
  }
});

router.put('/user', (req, res) => {
  const accountData = req.body;
  //Handle account update logic here (e.g., update database)
  //1. Validate input data
  //    a. Check for required fields (e.g., userId, fields to update)
  //2. Check if user exists
  //3. Update user in database
  res.json({ message: 'Account updated', data: accountData });
});

router.delete('/user', (req, res) => {
  const { userId } = req.query;
  //Handle account deletion logic here (e.g., remove from database)
  //1. Validate userId
  //2. Check if user exists
  //3. Delete user from database
  res.json({ message: 'Account deleted', userId });
});

router.get('/verify-email', (req, res) => {
  const { email } = req.query;
  //Handle email verification logic here (e.g., check verification token)
  //1. Validate email
  //2. Fetch user from database based on email
  //3. Check if email is already verified
  //4. Update user record to mark email as verified
  res.json({ message: 'Email verification endpoint', email });
});

router.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  //Handle password reset logic here (e.g., send reset email)
  //1. Validate email
  //2. Fetch user from database based on email
  //3. Generate password reset token
  //4. Send password reset email with token
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  if (!isValidEmail(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  } else {
    await resend.emails.send({
      from: 'noreply@ktv3.org',
      to: email,
      subject: 'Password Reset',
      html: '<p>You have requested to reset your password. Please click the link below to reset your password:</p><p><a href="http://localhost:3000/reset-password?email=' + email + '">Reset Password</a></p>'
    }).then(() => {
      console.log('Password reset email sent to ' + email);
      return res.json({ message: 'Password reset email sent', email });
    }).catch((error) => {
      console.error('Error sending password reset email:', error);
      return res.status(500).json({ message: 'Error sending password reset email' });
    });
  }
});

router.post('/change-password', (req, res) => {
  const { userId, oldPassword, newPassword } = req.body;
  //Handle password change logic here (e.g., update password in database)
  //1. Validate input data
  //    a. Check for required fields (e.g., userId, oldPassword, newPassword)
  //2. Fetch user from database based on userId
  //3. Compare old password with stored hashed password
  //4. Hash new password
  //5. Update user record with new hashed password
  res.json({ message: 'Change password endpoint', userId });
});

// Export the router
module.exports = router;
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        
        console.log('Registration attempt:', { name, email, role });
        
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }
        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists with this email' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            name,
            email,
            role,
            password: hashedPassword,
        });
        
        if (user) {
            req.session.userId = user._id;
            req.session.role = user.role;
            console.log('User created successfully:', user._id);
            res.json({ redirectTo: `/${user.role.toLowerCase()}/dashboard` });
        } else {
            return res.status(400).json({ message: 'Registration failed - could not create user' });
        }
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: error.message || 'Server error during registration' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: 'Please enter all fields' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        req.session.userId = user._id;
        req.session.role = user.role;
        res.json({ redirectTo: `/${user.role.toLowerCase()}/dashboard` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ message: 'Logout failed' });
        res.clearCookie('connect.sid');
        res.json({ message: 'Logged out successfully' });
    });
}

const me = (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    res.json({ userId: req.session.userId, role: req.session.role });
}

export { register, login, logout, me };


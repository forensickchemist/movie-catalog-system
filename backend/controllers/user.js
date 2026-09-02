const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");

const createToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" }
    );
};

const register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: "Password must be at least 8 characters"
        });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({
            message: "Email is already registered"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        email,
        password: hashedPassword
    });

    res.status(201).json({
        message: "Registered Successfully"
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    const access = createToken(user._id.toString());

    res.status(200).json({
        access,
    });
});

const getCurrentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json({
        user: {
            id: user._id,
            email: user.email,
            isAdmin: user.isAdmin
        }
    });
});

module.exports = { register, login, getCurrentUser };
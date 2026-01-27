const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    try {
          console.log('REQ BODY 👉', req.body)
        const { name, email, password, confirmPassword } = req.body || {};
        

        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);        

        const newUser = await User.create({
            name, email, password: hashedPassword
        })

        res.status(201).json({ message: "User registered successfully", userId: newUser._id});
    } catch (err) {
         console.error("SIGNUP ERROR 👉", err);
        res.status(500).json({ message: "Server error" });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const payload = {
            userId: user._id,
        }

        const jwt_token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });

        res.status(200).json({ jwt_token, userId: user._id });
    } catch (err) {
        console.error("login ERROR 👉", err);
        res.status(500).json({ message: "Server error" });
    }
}

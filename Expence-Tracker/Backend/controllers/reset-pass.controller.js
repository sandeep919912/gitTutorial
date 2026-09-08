const { ResetPass, Users } = require("../models");
const bcrypt = require("bcrypt")

const verificationCheck = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await ResetPass.findOne({
      where: {
        id,
        isActive: true,
      },
    });

    if (!result) {
      return res.status(404).send(`
        <h1>Invalid Reset Link</h1>
        <p>This password reset link is invalid or has already been used.</p>
      `);
    }

    return res.status(200).send(`
      <h1>Reset Password</h1>

      <form method="POST" action="/email/resetpassword/${id}">
        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          required
        />

        <button type="submit">
          Reset Password
        </button>
      </form>
    `);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required"
      });
    }

    // 1. Check reset request
    const resetRequest = await ResetPass.findOne({
      where: {
        id,
        isActive: true
      }
    });

    if (!resetRequest) {
      return res.status(404).json({
        message: "Invalid or expired reset link"
      });
    }

    // 2. Find user
    const user = await Users.findByPk(resetRequest.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // 3. Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Update password
    user.password = hashedPassword;
    await user.save();

    // 5. Deactivate reset request
    resetRequest.isActive = false;
    await resetRequest.save();

    return res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {verificationCheck , updatePassword};
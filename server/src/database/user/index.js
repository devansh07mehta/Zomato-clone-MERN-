import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        fullname: { type: String },
        email: { type: String, required: true },
        password: { type: String },
        address: [{ detail: { type: String }, for: { type: String } }],
        phoneNumber: [{ type: Number }],
    },
    {
        timestamps: true
    }
);

// attachments
UserSchema.methods.generateJwtToken = function () {
    return jwt.sign({ user: this._id.toString() }, "ZomatoApp")
};

// helper functions
UserSchema.statics.findByEmailAndPhone = async ({ email, phoneNumber }) => {
    const checkUserByEmail = await UserModel.findOne({ email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByEmail || checkUserByPhone) {
        throw new Error("User already exists !!!");
    }
    return false;
};

UserSchema.statics.findByEmailAndPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User doesn't exist !!!");

    // Compare Password
    const doesPasswordMatch = await bcrypt.compare(password, user.password)
    if (!doesPasswordMatch) throw new Error("Invalid Credentials !!!");

    return user;
};

UserSchema.pre('save', function (next) {
    const user = this;

    // password is been modified or not ??
    if (!user.isModified('password')) return next();

    // generate bcrypt & salt
    bcrypt.genSalt(8, (error, salt) => {   // salt should be lesser or equal to 10 if it's more than 10 then it will take much time to compile.
        if (error) return next(error);

        // salt => hash the password for given number of time => Here it's 8.
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            // will be assigning hashed password back
            user.password = hash;
            return next();
        });
    });
});

export const UserModel = mongoose.model("users", UserSchema);
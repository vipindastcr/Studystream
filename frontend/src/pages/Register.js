"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Register;
var jsx_runtime_1 = require("react/jsx-runtime");
// src/pages/Register.tsx
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("zod");
var zod_2 = require("@hookform/resolvers/zod");
var register_image_jpg_1 = require("@/assets/images/register_image.jpg");
var studystream_logo_white_2X_png_1 = require("@/assets/logos/studystream logo white 2X.png");
var lucide_react_1 = require("lucide-react");
var authService_1 = require("@/services/authService");
// Zod schema
var registerSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(1, "First name is required"),
    lastName: zod_1.z.string().min(1, "Last name is required"),
    email: zod_1.z.string().email("Invalid email"),
    phone: zod_1.z.string().min(7, "Phone number is too short"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: zod_1.z.string().min(1, "Please confirm your password"),
    role: zod_1.z.enum(["user", "tutor"]),
})
    .refine(function (data) { return data.password === data.confirmPassword; }, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});
function Register() {
    var _a = (0, react_hook_form_1.useForm)({
        resolver: (0, zod_2.zodResolver)(registerSchema),
        defaultValues: {
            role: "user",
        },
    }), register = _a.register, handleSubmit = _a.handleSubmit, watch = _a.watch, reset = _a.reset, _b = _a.formState, errors = _b.errors, isSubmitting = _b.isSubmitting;
    var _c = (0, react_1.useState)(false), showPassword = _c[0], setShowPassword = _c[1];
    var _d = (0, react_1.useState)(false), showConfirm = _d[0], setShowConfirm = _d[1];
    var _e = (0, react_1.useState)(null), apiError = _e[0], setApiError = _e[1];
    var _f = (0, react_1.useState)(null), apiSuccess = _f[0], setApiSuccess = _f[1];
    var _g = (0, react_1.useState)(null), otpContext = _g[0], setOtpContext = _g[1];
    var _h = (0, react_1.useState)(""), otpValue = _h[0], setOtpValue = _h[1];
    var _j = (0, react_1.useState)(null), otpError = _j[0], setOtpError = _j[1];
    var _k = (0, react_1.useState)(null), otpSuccess = _k[0], setOtpSuccess = _k[1];
    var _l = (0, react_1.useState)(false), isVerifyingOtp = _l[0], setIsVerifyingOtp = _l[1];
    function onSubmit(data) {
        return __awaiter(this, void 0, void 0, function () {
            var res, err_1, message;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        setApiError(null);
                        setApiSuccess(null);
                        setOtpSuccess(null);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, authService_1.registerUser)({
                                firstName: data.firstName,
                                lastName: data.lastName,
                                email: data.email,
                                phone: data.phone,
                                password: data.password,
                                role: data.role,
                            })];
                    case 2:
                        res = _e.sent();
                        console.log("Registered user:", res);
                        setApiSuccess("Registration successful! Check your email for the OTP.");
                        setOtpContext({ userId: res.userId, email: res.email });
                        setOtpError(null);
                        setOtpValue("");
                        reset({ role: "user" });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _e.sent();
                        console.error("Register error:", err_1);
                        message = ((_b = (_a = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                            ((_d = (_c = err_1 === null || err_1 === void 0 ? void 0 : err_1.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) ||
                            "Registration failed. Please try again.";
                        setApiError(message);
                        setOtpContext(null);
                        setOtpValue("");
                        setOtpError(null);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }
    function handleOtpSubmit(event) {
        return __awaiter(this, void 0, void 0, function () {
            var response, err_2, message;
            var _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        event.preventDefault();
                        if (!otpContext)
                            return [2 /*return*/];
                        setOtpError(null);
                        setOtpSuccess(null);
                        setIsVerifyingOtp(true);
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, (0, authService_1.verifyOtp)({ userId: otpContext.userId, otp: otpValue })];
                    case 2:
                        response = _e.sent();
                        setOtpSuccess(response.message || "Email verified successfully!");
                        setOtpContext(null);
                        setOtpValue("");
                        return [3 /*break*/, 5];
                    case 3:
                        err_2 = _e.sent();
                        console.error("OTP verification error:", err_2);
                        message = ((_b = (_a = err_2 === null || err_2 === void 0 ? void 0 : err_2.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) ||
                            ((_d = (_c = err_2 === null || err_2 === void 0 ? void 0 : err_2.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.error) ||
                            "Invalid or expired OTP. Please try again.";
                        setOtpError(message);
                        return [3 /*break*/, 5];
                    case 4:
                        setIsVerifyingOtp(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen flex flex-col items-center justify-center bg-[#49BBBD]", children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center mb-0.5rem ", children: (0, jsx_runtime_1.jsx)("img", { src: studystream_logo_white_2X_png_1.default, alt: "", className: "mt-20 mb-[0.1rem] w-40 mr-2 pt-4" }) }), (0, jsx_runtime_1.jsxs)("div", { className: "w-[95%] max-w-6xl bg-white flex flex-col md:flex-row rounded-2xl shadow-lg overflow-hidden scale-55 md:scale-70 transition-transform font-inter", children: [(0, jsx_runtime_1.jsx)("div", { className: "hidden md:block md:w-1/2", children: (0, jsx_runtime_1.jsx)("img", { src: register_image_jpg_1.default, alt: "hero", className: "w-full h-full object-cover", style: { minHeight: 520 } }) }), (0, jsx_runtime_1.jsx)("div", { className: "w-full md:w-1/2 bg-white p-8 md:p-10 flex flex-col justify-center", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-[380px] mx-auto w-full", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-center text-xl font-semibold text-slate-700", children: "User Register" }), (0, jsx_runtime_1.jsxs)("p", { className: "text-center text-sm text-slate-400 mt-1 mb-6", children: ["Already have an account?", " ", (0, jsx_runtime_1.jsx)("a", { className: "text-tealbrand font-medium", href: "#", children: "Login" })] }), apiError && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs mb-2 text-center", children: apiError })), apiSuccess && ((0, jsx_runtime_1.jsx)("p", { className: "text-green-600 text-xs mb-2 text-center", children: apiSuccess })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-1", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-xs text-slate-500", children: "First name" }), (0, jsx_runtime_1.jsx)("input", __assign({}, register("firstName"), { placeholder: "Enter your first name", className: "w-full rounded-full border border-[#49BBBD] py-3 px-4 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#49BBBD]" })), errors.firstName && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs", children: errors.firstName.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-1", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-xs text-slate-500", children: "Last name" }), (0, jsx_runtime_1.jsx)("input", __assign({}, register("lastName"), { placeholder: "Enter your last name", className: "w-full rounded-full border border-[#49BBBD] py-3 px-4 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#49BBBD]" })), errors.lastName && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs", children: errors.lastName.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-1", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-xs text-slate-500", children: "Email" }), (0, jsx_runtime_1.jsx)("input", __assign({}, register("email"), { placeholder: "Enter your email id", className: "w-full rounded-full border border-[#49BBBD] py-3 px-4 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#49BBBD]" })), errors.email && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs", children: errors.email.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-1", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-xs text-slate-500", children: "Phone number" }), (0, jsx_runtime_1.jsx)("input", __assign({}, register("phone"), { placeholder: "Enter your phone no", className: "w-full rounded-full border border-[#49BBBD] py-3 px-4 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#49BBBD]" })), errors.phone && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs", children: errors.phone.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-1 relative", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-xs text-slate-500", children: "Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", __assign({}, register("password"), { type: showPassword ? "text" : "password", placeholder: "Enter your Password", className: "w-full rounded-full border border-[#49BBBD] py-3 px-4 pr-10 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#49BBBD]" })), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return setShowPassword(function (s) { return !s; }); }, className: "absolute right-3 top-1/2 -translate-y-1/2 p-1", "aria-label": "toggle password", children: showPassword ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { size: 16 }) })] }), errors.password && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs", children: errors.password.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-1 gap-1 relative", children: [(0, jsx_runtime_1.jsx)("label", { className: "text-xs text-slate-500", children: "Confirm Password" }), (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("input", __assign({}, register("confirmPassword"), { type: showConfirm ? "text" : "password", placeholder: "Confirm Password", className: "w-full rounded-full border border-[#49BBBD] py-3 px-4 pr-10 text-sm placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#49BBBD]" })), (0, jsx_runtime_1.jsx)("button", { type: "button", onClick: function () { return setShowConfirm(function (s) { return !s; }); }, className: "absolute right-3 top-1/2 -translate-y-1/2 p-1", "aria-label": "toggle confirm password", children: showConfirm ? (0, jsx_runtime_1.jsx)(lucide_react_1.EyeOff, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.Eye, { size: 16 }) })] }), errors.confirmPassword && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs", children: errors.confirmPassword.message }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-6 text-sm mt-1", children: [(0, jsx_runtime_1.jsxs)("label", { className: "inline-flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("input", __assign({ type: "radio", value: "user" }, register("role"), { defaultChecked: true, className: "form-radio" })), (0, jsx_runtime_1.jsx)("span", { className: "text-slate-500", children: "user" })] }), (0, jsx_runtime_1.jsxs)("label", { className: "inline-flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("input", __assign({ type: "radio", value: "tutor" }, register("role"), { className: "form-radio" })), (0, jsx_runtime_1.jsx)("span", { className: "text-slate-500", children: "tutor" })] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-4 mt-4", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", className: "flex-1 border border-gray-300 rounded-full py-2 px-4 text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50", children: [(0, jsx_runtime_1.jsx)("img", { src: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg", alt: "google", className: "w-5 h-5" }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm", children: "Sign in with Google" })] }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isSubmitting, className: "bg-[#49BBBD] text-white rounded-full py-2 px-6 text-sm shadow hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed", children: isSubmitting ? "Registering..." : "Register" })] })] }), otpContext && ((0, jsx_runtime_1.jsxs)("div", { className: "mt-8 border-t border-slate-100 pt-6", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-slate-500 text-center mb-3", children: ["Enter the 6-digit OTP sent to", " ", (0, jsx_runtime_1.jsx)("span", { className: "font-medium text-slate-700", children: otpContext.email })] }), otpError && ((0, jsx_runtime_1.jsx)("p", { className: "text-red-500 text-xs mb-2 text-center", children: otpError })), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleOtpSubmit, className: "flex flex-col gap-3", children: [(0, jsx_runtime_1.jsx)("input", { value: otpValue, onChange: function (event) {
                                                        return setOtpValue(event.target.value.replace(/\D/g, "").slice(0, 6));
                                                    }, placeholder: "Enter OTP", inputMode: "numeric", maxLength: 6, className: "w-full rounded-full border border-[#49BBBD] py-3 px-4 text-center tracking-[0.4em] text-lg placeholder:text-slate-300 focus:outline-none focus:ring-1 focus:ring-[#49BBBD]" }), (0, jsx_runtime_1.jsx)("button", { type: "submit", disabled: isVerifyingOtp || otpValue.length !== 6, className: "bg-[#2b8789] text-white rounded-full py-2 px-6 text-sm shadow hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed", children: isVerifyingOtp ? "Verifying..." : "Verify OTP" })] })] })), otpSuccess && ((0, jsx_runtime_1.jsx)("p", { className: "text-green-600 text-xs mt-4 text-center", children: otpSuccess }))] }) })] })] }));
}

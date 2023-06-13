const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;

  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

/**
 * REGISTER_USER
 * @param req - 클라이언트에서 입력받은 데이터
 * @param res - 클라이언트로 전송해줄 데이터
 * @returns {Promise<*>}
 */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) {
      return res.status(400).json("이미 등록되어 있는 이메일 입니다.");
    }

    if (!name || !email || !password)
      return res.status(400).json("모든 항목을 입력해 주세요.");

    if (!validator.isEmail(email))
      return res.status(400).json("유요한 형식의 이메일 이어야 합니다.");

    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .json("비밀번호는 대문자, 소문자, 숫자, 특수기호로 조합해 주세요");

    user = new userModel({ name, email, password });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

/**
 * LOGIN_USER
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) return res.status(400).json("이메일을 입력해 주세요");

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword)
      return res.status(400).json("비밀번호를 확인해 주세요");

    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, name: user.name, email, password });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser };

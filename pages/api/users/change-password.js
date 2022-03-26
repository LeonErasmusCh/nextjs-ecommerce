import nc from 'next-connect';
import User from '../../../models/User';
import db from '../../../utils/db';
import onError from '../../../utils/error';
import bcrypt from 'bcryptjs';

const handler = nc({
  onError,
});

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    (user.password = bcrypt.hashSync(req.body.password)), await db.disconnect();
    await user.save();
    res.send({ message: 'Change password for', user });
  } else {
    await db.disconnect();
    res.status(404).send({ message: 'user not found' });
  }
});

export default handler;

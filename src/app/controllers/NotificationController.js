import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const CheckIsProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!CheckIsProvider) {
      return res.status(401).json({
        error: 'Somente funcionários verificam notificações',
      });
    }

    const notifications = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(40);

    return res.json(notifications);
  }

  async update(req, res) {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true,
      },
      { new: true }
    );
    return res.json(notification);
  }
}

export default new NotificationController();

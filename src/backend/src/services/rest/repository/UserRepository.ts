import { User } from "../models";

export class UserRepository {
  static async findAll() {
    return User.findAll();
  }

  static async findById(id: number) {
    return User.findByPk(id);
  }

  static async create(userData: any) {
    return User.create(userData);
  }

  static async update(id: number, userData: any) {
    const user = await User.findByPk(id);
    if (!user) return null;
    return user.update(userData);
  }

  static async remove(id: number) {
    const user = await User.findByPk(id);
    if (!user) return null;
    await user.destroy();
    return user;
  }
}

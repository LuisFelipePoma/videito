import { UserRepository } from "../repository/UserRepository";

export class UserService {
  static async getAll() {
    return UserRepository.findAll();
  }

  static async getById(id: number) {
    return UserRepository.findById(id);
  }

  static async create(userData: any) {
    return UserRepository.create(userData);
  }

  static async update(id: number, userData: any) {
    return UserRepository.update(id, userData);
  }

  static async remove(id: number) {
    return UserRepository.remove(id);
  }
}

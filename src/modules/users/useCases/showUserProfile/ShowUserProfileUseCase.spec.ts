import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository';
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { IUsersRepository } from "../../repositories/IUsersRepository";


let showUserProfileUseCase:ShowUserProfileUseCase;
let createUserUseCase:CreateUserUseCase;
let inMemoryUserRepository:IUsersRepository;

describe("User profile",()=>{

  beforeEach(()=>{
    inMemoryUserRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)
    showUserProfileUseCase = new ShowUserProfileUseCase(inMemoryUserRepository)
  })

  it("should be able list users", async ()=>{

    const user ={
      name: "willian",
      email: "willian@teste.com",
      password: "21234"
    }

    const newUser = await createUserUseCase.execute(user)

    const user_id = String(newUser.id);
    const listProfile = await showUserProfileUseCase.execute(user_id)

    expect(listProfile.email).toEqual(user.email)
    expect(listProfile.name).toEqual(user.name)

  });

});

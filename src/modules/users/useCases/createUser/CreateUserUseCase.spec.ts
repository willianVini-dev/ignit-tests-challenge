import { InMemoryUsersRepository } from './../../repositories/in-memory/InMemoryUsersRepository';
import { CreateUserUseCase } from './CreateUserUseCase';
import { IUsersRepository } from '../../repositories/IUsersRepository';
describe("Create User", ()=>{

  let createUserUseCase:CreateUserUseCase;
  let inMemoryUserRepository:IUsersRepository;

  beforeEach(()=>{
    inMemoryUserRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUserRepository)

  });

  it("should be able create a new user", async ()=>{

    const response = await createUserUseCase.execute({
      name: "teste-teste",
      email: "teste@hotmail.com",
      password: "1234567890"
    })

    expect(response).toHaveProperty("id")

  })

})

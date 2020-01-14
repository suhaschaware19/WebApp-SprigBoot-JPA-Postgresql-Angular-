import { TestBed } from "@angular/core/testing";
import { UserService } from "./user.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("UserService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    })
  );
  it("should be created", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
  it("should have getUsers function", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getUsers).toBeTruthy();
  });
  it("should have saveUser function", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.saveUser).toBeTruthy();
  });
  it("should have deleteUser function", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.deleteUser).toBeTruthy();
  });
});

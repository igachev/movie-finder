
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginComponent } from './login.component';
import { UserLoginRequest, UserLoginResponse, UserRegisterResponse } from '../../types/UserTypes';
import { render,screen } from '@testing-library/angular';
import { EmailDirective } from '../../directives/email.directive';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { UserService } from '../../services/user.service';
import userEvent from '@testing-library/user-event';

describe('LoginComponent', () => {

  afterEach(() => {
    jest.clearAllMocks();
  })

  test("should have label with text 'Email:'", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    const emailLabel = await screen.findByText("Email:")
    expect(emailLabel).toBeInTheDocument()
  })

  test("should have label with text 'Password:'", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    const passwordLabel = await screen.findByText("Password:")
    expect(passwordLabel).toBeInTheDocument()
  })

  test("should have button with text 'Login'", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });

    const loginBtn = await screen.findByRole("button", {name: /login/i})
    expect(loginBtn).toBeInTheDocument()
  })

  test("should have email input element", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
  })

   test("should not show message 'Email is required' without interaction with the input field", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    const emailIsRequired = screen.queryByText(new RegExp("email is required","i"))
    expect(emailIsRequired).not.toBeInTheDocument();
  })

  test("should show 'Email is required' message if the user leave the email input field empty", async() => {
    const mockUserSubject = new BehaviorSubject<UserRegisterResponse>({
            email: '',
            token: '',
            userName: ''
          });

    const mockLoginResponse = {
            email: 'ivan@abv.bg',
            token: '1234',
            userName: 'ivan'
          };
    const mockUserLoginRequest = {
            email: 'ivan@abv.bg',
            password: '123456'
    }
    const userService = {
      login: jest.fn((userLoginRequest: UserLoginRequest): Observable<UserLoginResponse> => of(mockLoginResponse)),
      $userSubjectObservable: mockUserSubject
    };

    await render(LoginComponent, {
      declarations: [
        LoadingSpinnerComponent,
         EmailDirective
      ],
      providers: [
        {
          provide: UserService,
          useValue: userService
        }
      ]
    });
    // name is actually the content text in Label element
    const emailInput = screen.getByRole("textbox", {name: "Email:"}) 
    expect(emailInput).toBeInTheDocument()
    const user = userEvent.setup()
    await user.click(emailInput)
    await user.tab();
    const emailIsRequired = await screen.findByText(new RegExp("email is required","i"))
    expect(emailIsRequired).toBeInTheDocument();
  })

});

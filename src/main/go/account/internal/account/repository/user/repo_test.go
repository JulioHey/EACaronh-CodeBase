package user

import (
	"account/internal/account/api"
	"encoding/json"
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/stretchr/testify/mock"
)

type mockHttpClienteInterface struct {
	mock.Mock
	api.HttpClientInterface
}

func (m *mockHttpClienteInterface) Put(fullURL string, body interface{}) (*api.Response, error) {
	args := m.Called(fullURL, body)
	return args.Get(0).(*api.Response), args.Error(1)
}

func (m *mockHttpClienteInterface) Post(fullURL string, body interface{}) (*api.Response, error) {
	args := m.Called(fullURL, body)
	return args.Get(0).(*api.Response), args.Error(1)
}

func (m *mockHttpClienteInterface) Get(fullURL string, body interface{}) (*api.Response, error) {
	args := m.Called(fullURL, body)
	return args.Get(0).(*api.Response), args.Error(1)
}

var _ = Describe("UserRepository", func() {
	var mockClient *mockHttpClienteInterface
	var repo repoImpl

	BeforeEach(func() {
		mockClient = new(mockHttpClienteInterface)
		repo = repoImpl{
			client: mockClient,
			url:    "url",
		}
	})

	Describe("CreateUser", func() {
		It("should create user successfully", func() {
			resUser := User{
				ID: "123",
			}

			msg, _ := json.Marshal(resUser)

			mockClient.On("Post", "url/users/",
				mock.MatchedBy(func(req User) bool {
					Expect(req.Email).To(Equal("email"))
					Expect(req.Name).To(Equal("name"))
					Expect(req.PhoneNumber).To(Equal("phoneNumber"))
					Expect(req.DocumentNumber).To(Equal("documentNumber"))
					Expect(req.BirthDate).To(Equal("birthDate"))

					return true
				})).
				Return(
					&api.Response{
						StatusCode: 201,
						Msg:        msg,
					}, nil)

			id, err := repo.CreateUser(User{
				Email:          "email",
				Name:           "name",
				PhoneNumber:    "phoneNumber",
				DocumentNumber: "documentNumber",
				BirthDate:      "birthDate",
			})

			Expect(id).To(Equal("123"))
			Expect(err).ToNot(HaveOccurred())
		})

		It("should not create user when url or client is missing", func() {
			repo.url = ""
			id, err := repo.CreateUser(User{
				Email:          "email",
				Name:           "name",
				PhoneNumber:    "phoneNumber",
				DocumentNumber: "documentNumber",
				BirthDate:      "birthDate",
			})

			Expect(id).To(Equal(""))
			Expect(err).To(HaveOccurred())
		})

		It("should not create when response status code is not 201", func() {
			resUser := User{
				ID: "123",
			}

			msg, _ := json.Marshal(resUser)

			mockClient.On("Post", "url/users/",
				mock.MatchedBy(func(req User) bool {
					Expect(req.Email).To(Equal("email"))
					Expect(req.Name).To(Equal("name"))
					Expect(req.PhoneNumber).To(Equal("phoneNumber"))
					Expect(req.DocumentNumber).To(Equal("documentNumber"))
					Expect(req.BirthDate).To(Equal("birthDate"))

					return true
				})).
				Return(
					&api.Response{
						StatusCode: 200,
						Msg:        msg,
					}, nil)

			id, err := repo.CreateUser(User{
				Email:          "email",
				Name:           "name",
				PhoneNumber:    "phoneNumber",
				DocumentNumber: "documentNumber",
				BirthDate:      "birthDate",
			})

			Expect(id).To(Equal(""))
			Expect(err).To(HaveOccurred())
		})
	})
})

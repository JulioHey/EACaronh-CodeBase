package repository

import (
	. "github.com/onsi/ginkgo/v2"
	. "github.com/onsi/gomega"
	"github.com/stretchr/testify/mock"
	"gorm.io/gorm"
)

type TestModel struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

func (t *TestModel) GetID() string {
	return t.ID
}

func (t *TestModel) SetID(id string) {
	t.ID = id
}

type mockGormDb struct {
	mock.Mock
	GormDatabase
}

func (m *mockGormDb) Create(value interface{}) *gorm.DB {
	args := m.Called(value)
	return args.Get(0).(*gorm.DB)
}

func (m *mockGormDb) Updates(values interface{}) *gorm.DB {
	args := m.Called(values)
	return args.Get(0).(*gorm.DB)
}

func (m *mockGormDb) Delete(value interface{}, conds ...interface{}) *gorm.DB {
	args := m.Called(value, conds)
	return args.Get(0).(*gorm.DB)
}

func (m *mockGormDb) First(dest interface{}, conds ...interface{}) *gorm.DB {
	args := m.Called(dest, conds)
	return args.Get(0).(*gorm.DB)
}

func (m *mockGormDb) Find(dest interface{}, conds ...interface{}) *gorm.DB {
	args := m.Called(dest, conds)
	return args.Get(0).(*gorm.DB)
}

var _ = Describe("Repository", func() {
	var gormDb *mockGormDb
	var repo *BaseRepository[*TestModel]

	BeforeEach(func() {
		gormDb = new(mockGormDb)
		repo = &BaseRepository[*TestModel]{
			Database: gormDb,
		}
	})

	Describe("Create", func() {
		It("should create a model successufully", func() {
			gormDb.On("Create", mock.MatchedBy(func(value *TestModel) bool {
				Expect(value.ID).To(Equal("id"))
				Expect(value.Name).To(Equal("name"))

				return true
			})).Return(&gorm.DB{
				Error:        nil,
				RowsAffected: 1,
			})

			result, err := repo.Create(&TestModel{
				ID:   "id",
				Name: "name",
			})

			Expect(result.ID).To(Equal("id"))
			Expect(result.Name).To(Equal("name"))
			Expect(err).ToNot(HaveOccurred())
		})

		It("should return err when creating model failed", func() {
			gormDb.On("Create", mock.MatchedBy(func(value *TestModel) bool {
				Expect(value.ID).To(Equal("id"))
				Expect(value.Name).To(Equal("name"))

				return true
			})).Return(&gorm.DB{
				Error:        gorm.ErrInvalidData,
				RowsAffected: 1,
			})

			_, err := repo.Create(&TestModel{
				ID:   "id",
				Name: "name",
			})

			Expect(err).To(HaveOccurred())
		})
	})

	Describe("Update", func() {
		It("should update a model successufully", func() {
			gormDb.On("Updates", mock.MatchedBy(func(value *TestModel) bool {
				Expect(value.ID).To(Equal("id"))
				Expect(value.Name).To(Equal("name"))

				return true
			})).Return(&gorm.DB{
				Error:        nil,
				RowsAffected: 1,
			})

			err := repo.Update(&TestModel{
				ID:   "id",
				Name: "name",
			})

			Expect(err).ToNot(HaveOccurred())
		})
	})
})

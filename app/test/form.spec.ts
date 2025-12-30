  // 1.値が正常に入力された場合かつisCreateMode=trueの場合はcreateShopを実行
  // 2.値が正常に入力された場合かつisCreateMode=falseの場合はupdateShopを実行
  // 3.nameがない場合は、店名は必須です表示
  // 4.categoryがない場合は、カテゴリは必須です表示
  // 5.nameとcategoryがない場合は、店名は必須です、カテゴリは必須です表示
import { submitShopForm } from "./submitSopForm"; // ← 実際のパス・名前に変えて

describe("submitShopForm", () => {
  let createShopMock: jest.Mock;
  let updateShopMock: jest.Mock;
  let setErrorMock: jest.Mock;

  const validFormValues = {
    // TODO: 正常な name, category をここに定義
    // name: "○○",
    // category: "△△",
  };

  beforeEach(() => {
    createShopMock = jest.fn().mockResolvedValue(/* TODO: 成功レスポンス想定 */);
    updateShopMock = jest.fn().mockResolvedValue(/* TODO: 成功レスポンス想定 */);
    setErrorMock = jest.fn();
  });

  test("値が正常 & isCreateMode=true の場合は createShop を実行する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "月華",
      catergory: 'レストラン',
      subCatergory: '中華',
      count:  0,
    };

    // Act
    await submitShopForm(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });
  });

  test("値が正常 & isCreateMode=true の場合は createShop を実行する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "月華",
      catergory: 'レストラン',
      subCatergory: '中華',
      count:  0,
    };

    // Act
    await submitShopForm(formValues, {
      isCreateMode: false,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });
  });

  test("name がない場合は『店名は必須です』を表示する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "",
      catergory: 'レストラン',
      subCatergory: '中華',
      count:  0,
    };

    // Act
    await submitShopForm(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });
  });

  test("category がない場合は『カテゴリは必須です』を表示する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "月華",
      catergory: '',
      subCatergory: '中華',
      count:  0,
    };

    // Act
    await submitShopForm(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });
  });

  test("name と category がない場合は両方のエラーを表示する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "",
      catergory: '',
      subCatergory: '中華',
      count:  0,
    };

    // Act
    await submitShopForm(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });
  });
});
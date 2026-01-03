  // 1.値が正常に入力された場合かつisCreateMode=trueの場合はcreateShopを実行
  // 2.値が正常に入力された場合かつisCreateMode=falseの場合はupdateShopを実行
  // 3.nameがない場合は、店名は必須です表示
  // 4.categoryがない場合は、カテゴリは必須です表示
  // 5.nameとcategoryがない場合は、店名は必須です、カテゴリは必須です表示
  import { useListComposition } from '@/compositions/list.composition'
  const { form, errors, ui, setForm, submit } = useListComposition()

describe("submit", () => {
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
      category: 'レストラン',
      subCategory: '中華',
      count:  0,
    };

    // Act
    await onSubmit(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });

    // Assert ← ここに expect を書く
    expect(createShopMock).toHaveBeenCalled();
    expect(updateShopMock).not.toHaveBeenCalled();
    // 2. updateShopMock が 呼ばれていないこと
    // 3. createShopMock に渡された引数が formValues を元にした期待値になっていること
  });

  test("値が正常 & isCreateMode=false の場合は updateShop を実行する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "月華",
      category: 'レストラン',
      subCategory: '中華',
      count:  0,
    };

    // Act
    await onSubmit(formValues, {
      isCreateMode: false,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });

    // Assert ← ここに expect を書く
    // 1. createShopMock が 呼ばれていないこと
    // 2. updateShopMock が 1回呼ばれていること
    // 3. createShopMock に渡された引数が formValues を元にした期待値になっていること
  });

  test("name がない場合は『店名は必須です』を表示する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "",
      category: 'レストラン',
      subCategory: '中華',
      count:  0,
    };

    // Act
    await onSubmit(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });

    // Assert ← ここに expect を書く
    // 1. createShopMock が 呼ばれていないこと
    // 2. updateShopMock が 呼ばれていないこと
  });

  test("category がない場合は『カテゴリは必須です』を表示する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "月華",
      category: '',
      subCategory: '中華',
      count:  0,
    };

    // Act
    await onSubmit(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });

    // Assert ← ここに expect を書く
    // 1. createShopMock が 呼ばれていないこと
    // 2. updateShopMock が 呼ばれていないこと
  });

  test("name と category がない場合は両方のエラーを表示する", async () => {
    // Arrange
    const formValues = {
      id: 1,
      name: "",
      category: '',
      subCategory: '中華',
      count:  0,
    };

    // Act
    await onSubmit(formValues, {
      isCreateMode: true,
      createShop: createShopMock,
      updateShop: updateShopMock,
      setError: setErrorMock,
    });

    // Assert ← ここに expect を書く
    // 1. createShopMock が 呼ばれていないこと
    // 2. updateShopMock が 呼ばれていないこと
  });
});
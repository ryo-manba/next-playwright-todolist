import { test, expect } from "@playwright/test";

const url = "http://localhost:3000";

test.describe("Todo App", () => {
  test.beforeEach(async ({ page }) => {
    // baseUrlが設定されている場合は、gotoの引数に渡すURLは省略できる
    // await page.goto("/");

    await page.goto(url);
  });

  test("Todoを追加できること", async ({ page }) => {
    await page.getByLabel("Todo").click();
    await page.getByLabel("Todo").fill("todo 1");
    await page.getByLabel("Todo").press("Enter");

    const todo = await page
      .getByRole("listitem")
      .locator("div")
      .filter({ hasText: "todo 1" });

    await expect(await todo.isVisible()).toBeTruthy();
  });

  test("チェックボックスをクリックすると斜線が入ること", async ({ page }) => {
    await page.getByLabel("Todo").click();
    await page.getByLabel("Todo").fill("todo 1");
    await page.getByLabel("Todo").press("Enter");

    // 生成された Todo の checkbox をクリックする
    await page.getByRole("checkbox").click();

    const todo = await page
      .getByRole("listitem")
      .locator("label")
      .filter({ hasText: "todo 1" });

    // 斜線が入っていることを確認する
    await expect(todo).toHaveClass(["line-through"]);
  });

  test("削除ボタンを押すと消えること", async ({ page }) => {
    await page.getByLabel("Todo").click();
    await page.getByLabel("Todo").fill("todo 1");
    await page.getByLabel("Todo").press("Enter");

    const todo = await page
      .getByRole("listitem")
      .locator("div")
      .filter({ hasText: "todo 1" });
    await expect(await todo.isVisible()).toBeTruthy();

    // 削除する
    await page.getByRole("button", { name: "delete" }).click();

    // 削除後に要素が存在しないことを確認する
    await expect(await todo.isVisible()).toBeFalsy();
  });

  test("追加したTodoを編集できること", async ({ page }) => {
    await page.getByLabel("Todo").click();
    await page.getByLabel("Todo").fill("todo 1");
    await page.getByLabel("Todo").press("Enter");

    const todo = await page
      .getByRole("listitem")
      .locator("div")
      .filter({ hasText: "todo 1" });
    await expect(await todo.isVisible()).toBeTruthy();

    // 編集する
    await page.getByRole("button", { name: "edit" }).click();
    await page.getByRole("listitem").getByRole("textbox").click();
    await page.getByRole("listitem").getByRole("textbox").fill("todo 42");
    await page.getByRole("button", { name: "save" }).click();

    const editedTodo = await page
      .getByRole("listitem")
      .locator("div")
      .filter({ hasText: "todo 42" });

    // 編集後のテキストが表示されていることを確認する
    await expect(await editedTodo.isVisible()).toBeTruthy();
  });
});

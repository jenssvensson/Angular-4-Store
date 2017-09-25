import { StorePage } from './app.po';

describe('Store App', () => {
  let page: StorePage;

  beforeEach(() => {
    page = new StorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

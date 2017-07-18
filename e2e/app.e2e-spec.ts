import { TShirtStorePage } from './app.po';

describe('tshirt-store App', () => {
  let page: TShirtStorePage;

  beforeEach(() => {
    page = new TShirtStorePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});

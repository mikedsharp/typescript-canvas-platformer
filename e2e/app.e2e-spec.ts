import { TypescriptCanvasPlatformerPage } from './app.po';

describe('typescript-canvas-platformer App', function() {
  let page: TypescriptCanvasPlatformerPage;

  beforeEach(() => {
    page = new TypescriptCanvasPlatformerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

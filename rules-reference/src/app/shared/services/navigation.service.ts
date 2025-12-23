import { Injectable } from '@angular/core';

export interface NavigationPage {
  id: string;
  title: string;
  route: string;
  parent?: string;
  order: number;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private pages: NavigationPage[] = [];

  setPages(pages: NavigationPage[]): void {
    this.pages = pages;
  }

  getAllPages(): NavigationPage[] {
    return [...this.pages];
  }

  getPage(id: string): NavigationPage | undefined {
    return this.pages.find(page => page.id === id);
  }

  getPageByRoute(route: string): NavigationPage | undefined {
    return this.pages.find(page => page.route === route);
  }

  getNextPage(currentPageId: string): NavigationPage | null {
    const currentPage = this.getPage(currentPageId);
    if (!currentPage) return null;

    const nextPage = this.pages.find(page => page.order === currentPage.order + 1);
    return nextPage || null;
  }

  getPreviousPage(currentPageId: string): NavigationPage | null {
    const currentPage = this.getPage(currentPageId);
    if (!currentPage) return null;

    const previousPage = this.pages.find(page => page.order === currentPage.order - 1);
    return previousPage || null;
  }

  getTopLevelPages(): NavigationPage[] {
    return this.pages.filter(page => !page.parent);
  }

  getChildPages(parentId: string): NavigationPage[] {
    return this.pages.filter(page => page.parent === parentId);
  }
}

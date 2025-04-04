/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedRouteImport } from './routes/_authenticated/route'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'

// Create Virtual Routes

const AuthenticatedRevenuesIndexLazyImport = createFileRoute(
  '/_authenticated/revenues/',
)()
const AuthenticatedProductsIndexLazyImport = createFileRoute(
  '/_authenticated/products/',
)()
const AuthenticatedPhasesIndexLazyImport = createFileRoute(
  '/_authenticated/phases/',
)()
const AuthenticatedFeesIndexLazyImport = createFileRoute(
  '/_authenticated/fees/',
)()

// Create/Update Routes

const AuthenticatedRouteRoute = AuthenticatedRouteImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AuthenticatedRouteRoute,
} as any)

const AuthenticatedRevenuesIndexLazyRoute =
  AuthenticatedRevenuesIndexLazyImport.update({
    id: '/revenues/',
    path: '/revenues/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/revenues/index.lazy').then((d) => d.Route),
  )

const AuthenticatedProductsIndexLazyRoute =
  AuthenticatedProductsIndexLazyImport.update({
    id: '/products/',
    path: '/products/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/products/index.lazy').then((d) => d.Route),
  )

const AuthenticatedPhasesIndexLazyRoute =
  AuthenticatedPhasesIndexLazyImport.update({
    id: '/phases/',
    path: '/phases/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any).lazy(() =>
    import('./routes/_authenticated/phases/index.lazy').then((d) => d.Route),
  )

const AuthenticatedFeesIndexLazyRoute = AuthenticatedFeesIndexLazyImport.update(
  {
    id: '/fees/',
    path: '/fees/',
    getParentRoute: () => AuthenticatedRouteRoute,
  } as any,
).lazy(() =>
  import('./routes/_authenticated/fees/index.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedRouteImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/fees/': {
      id: '/_authenticated/fees/'
      path: '/fees'
      fullPath: '/fees'
      preLoaderRoute: typeof AuthenticatedFeesIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/phases/': {
      id: '/_authenticated/phases/'
      path: '/phases'
      fullPath: '/phases'
      preLoaderRoute: typeof AuthenticatedPhasesIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/products/': {
      id: '/_authenticated/products/'
      path: '/products'
      fullPath: '/products'
      preLoaderRoute: typeof AuthenticatedProductsIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
    '/_authenticated/revenues/': {
      id: '/_authenticated/revenues/'
      path: '/revenues'
      fullPath: '/revenues'
      preLoaderRoute: typeof AuthenticatedRevenuesIndexLazyImport
      parentRoute: typeof AuthenticatedRouteImport
    }
  }
}

// Create and export the route tree

interface AuthenticatedRouteRouteChildren {
  AuthenticatedIndexRoute: typeof AuthenticatedIndexRoute
  AuthenticatedFeesIndexLazyRoute: typeof AuthenticatedFeesIndexLazyRoute
  AuthenticatedPhasesIndexLazyRoute: typeof AuthenticatedPhasesIndexLazyRoute
  AuthenticatedProductsIndexLazyRoute: typeof AuthenticatedProductsIndexLazyRoute
  AuthenticatedRevenuesIndexLazyRoute: typeof AuthenticatedRevenuesIndexLazyRoute
}

const AuthenticatedRouteRouteChildren: AuthenticatedRouteRouteChildren = {
  AuthenticatedIndexRoute: AuthenticatedIndexRoute,
  AuthenticatedFeesIndexLazyRoute: AuthenticatedFeesIndexLazyRoute,
  AuthenticatedPhasesIndexLazyRoute: AuthenticatedPhasesIndexLazyRoute,
  AuthenticatedProductsIndexLazyRoute: AuthenticatedProductsIndexLazyRoute,
  AuthenticatedRevenuesIndexLazyRoute: AuthenticatedRevenuesIndexLazyRoute,
}

const AuthenticatedRouteRouteWithChildren =
  AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof AuthenticatedRouteRouteWithChildren
  '/': typeof AuthenticatedIndexRoute
  '/fees': typeof AuthenticatedFeesIndexLazyRoute
  '/phases': typeof AuthenticatedPhasesIndexLazyRoute
  '/products': typeof AuthenticatedProductsIndexLazyRoute
  '/revenues': typeof AuthenticatedRevenuesIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof AuthenticatedIndexRoute
  '/fees': typeof AuthenticatedFeesIndexLazyRoute
  '/phases': typeof AuthenticatedPhasesIndexLazyRoute
  '/products': typeof AuthenticatedProductsIndexLazyRoute
  '/revenues': typeof AuthenticatedRevenuesIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_authenticated': typeof AuthenticatedRouteRouteWithChildren
  '/_authenticated/': typeof AuthenticatedIndexRoute
  '/_authenticated/fees/': typeof AuthenticatedFeesIndexLazyRoute
  '/_authenticated/phases/': typeof AuthenticatedPhasesIndexLazyRoute
  '/_authenticated/products/': typeof AuthenticatedProductsIndexLazyRoute
  '/_authenticated/revenues/': typeof AuthenticatedRevenuesIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/' | '/fees' | '/phases' | '/products' | '/revenues'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/fees' | '/phases' | '/products' | '/revenues'
  id:
    | '__root__'
    | '/_authenticated'
    | '/_authenticated/'
    | '/_authenticated/fees/'
    | '/_authenticated/phases/'
    | '/_authenticated/products/'
    | '/_authenticated/revenues/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthenticatedRouteRoute: typeof AuthenticatedRouteRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthenticatedRouteRoute: AuthenticatedRouteRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated/route.tsx",
      "children": [
        "/_authenticated/",
        "/_authenticated/fees/",
        "/_authenticated/phases/",
        "/_authenticated/products/",
        "/_authenticated/revenues/"
      ]
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/fees/": {
      "filePath": "_authenticated/fees/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/phases/": {
      "filePath": "_authenticated/phases/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/products/": {
      "filePath": "_authenticated/products/index.lazy.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/revenues/": {
      "filePath": "_authenticated/revenues/index.lazy.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */

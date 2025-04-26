import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { ProductsRemainingTable } from './components/fees-table'
import { columns } from './components/products-columns'
import ProductsProvider from './context/products-context'

export default function Overview() {
  return (
    <ProductsProvider>
      {' '}
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>
      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              San pham con lai
            </h2>
            {/* <p className='text-muted-foreground'>Quan ly phi.</p> */}
          </div>
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <div className='ht-theme-main-dark-auto'>
            <ProductsRemainingTable columns={columns} />
          </div>
        </div>
      </Main>
    </ProductsProvider>
  )
}

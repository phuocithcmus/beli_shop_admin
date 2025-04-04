import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { FeesDialogs } from './components/fees-dialogs'
import { FeesPrimaryButtons } from './components/fees-primary-buttons'
import { FeesTable } from './components/fees-table'
import { columns } from './components/users-columns'
import FeesProvider from './context/fees-context'

export default function Fees() {
  return (
    <FeesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Danh sach Phi</h2>
            {/* <p className='text-muted-foreground'>Quan ly phi.</p> */}
          </div>
          <FeesPrimaryButtons />
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <FeesTable columns={columns} />
        </div>
      </Main>
      <FeesDialogs />
    </FeesProvider>
  )
}

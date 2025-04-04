import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/revenues-columns'
import { RevenuesDialogs } from './components/revenues-dialogs'
import { RevenuesPrimaryButtons } from './components/revenues-primary-buttons'
import { RevenuesTable } from './components/revenues-table'
import PhasesProvider from './context/revenues-context'

export default function Revenues() {
  return (
    <PhasesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Revenues List</h2>
            <p className='text-muted-foreground'>Manage your revenues</p>
          </div>
          <RevenuesPrimaryButtons />
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <RevenuesTable columns={columns} />
        </div>
      </Main>
      <RevenuesDialogs />
    </PhasesProvider>
  )
}

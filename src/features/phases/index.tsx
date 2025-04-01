import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/phases-columns'
import { FeesDialogs } from './components/phases-dialogs'
import { PhasesPrimaryButtons } from './components/phases-primary-buttons'
import { PhasesTable } from './components/phases-table'
import PhasesProvider from './context/phases-context'

export default function Phases() {
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
            <h2 className='text-2xl font-bold tracking-tight'>Phases List</h2>
            <p className='text-muted-foreground'>Manage your phases</p>
          </div>
          <PhasesPrimaryButtons />
        </div>

        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <PhasesTable columns={columns} />
        </div>
      </Main>
      <FeesDialogs />
    </PhasesProvider>
  )
}

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from "react"
import type { Company, Gender, Generation, Group } from "../types/models"
import useGroups from "../hooks/GroupHook"
import type { ApiError } from "../types/utils"

interface GroupsContextValue {
  groups: Group[]
  length: number
  group: Group
  companies: Company[]
  generations: Generation[]
  genders: Gender[]
  loading: boolean
  apiError: ApiError
  getAllGroups: () => Promise<void>
  getGroupById: (id: number) => Promise<void>
  getGroupsByValue: (value: string, method: string) => Promise<void>
}

const GroupsContext = createContext<GroupsContextValue | undefined>(undefined)

const GroupsProvider = ({ children }: { children: ReactNode }) => {
  const groupsHook = useGroups()

  return (
    <GroupsContext.Provider value={groupsHook}>
      {children}
    </GroupsContext.Provider>
  )
}

const useGroupsContext = () => {
  const ctx = useContext(GroupsContext)

  if (!ctx)
    throw new Error("[useGroupsContext] must be used inside <GroupsProvider>")

  return ctx
}

export { GroupsProvider, useGroupsContext }
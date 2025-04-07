import { create } from 'zustand';

type RoleState = {
  role: {
    Role: string[];
    GroupMail: string;
    CurrentCostCenter: string;
  };
  setRole: (payload: Partial<RoleState['role']>) => void;
};

export const useRoleStore = create<RoleState>((set) => ({
  role: {
    Role: [],
    GroupMail: '',
    CurrentCostCenter: '',
  },
  setRole: (payload) =>
    set((state) => ({
      role: {
        ...state.role,
        Role: payload.Role || state.role.Role,
        GroupMail: payload.GroupMail || state.role.GroupMail,
        CurrentCostCenter: payload.CurrentCostCenter || state.role.CurrentCostCenter,
      },
    })),
}));

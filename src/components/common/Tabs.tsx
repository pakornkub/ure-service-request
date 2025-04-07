import React from 'react';
//* mui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Chip from '@mui/material/Chip';
//* store
import { useSettingStore } from '@/stores/useSettingStore';
import { useShallow } from 'zustand/react/shallow';
import config from '@/constants/config';

type ListProps = {
  status: number;
  name: string;
  count?: number;
  color?: string;
};

type Props = {
  list: ListProps[];
  tab: string;
  handleChangeTab(event: React.SyntheticEvent, newTab: string): void;
  children: React.ReactNode;
};

const Tabs: React.FC<Props> = ({ list, tab, handleChangeTab, children }) => {
  const { setting } = useSettingStore(useShallow((state) => state));

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={tab}>
          <Box
            component={'div'}
            sx={{ borderBottom: 1, borderColor: 'divider' }}
            className={
              config.theme === 'TopBar' ? '' : `w-full ${setting?.theme?.collapsed ? 'md:w-[calc(100vw-9rem)]' : 'md:w-[calc(100vw-18rem)]'} `
            }
          >
            <TabList onChange={handleChangeTab} aria-label="tab" variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
              {list?.map((item: ListProps, index: number) => (
                <Tab
                  key={index}
                  label={item.name}
                  value={String(item.status)}
                  icon={<Chip label={String(item?.count || 0)} />}
                  iconPosition="end"
                  className={`font-bold text-lg ${item?.color}`}
                />
              ))}
            </TabList>
          </Box>
          <TabPanel value={String(tab)}>{children}</TabPanel>
        </TabContext>
      </Box>
    </>
  );
};

export default Tabs;

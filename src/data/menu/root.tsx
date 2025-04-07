// assets
import WidgetsIcon from '@mui/icons-material/Widgets';
import MonitorIcon from '@mui/icons-material/Monitor';
import FolderIcon from '@mui/icons-material/Folder';
import CircleIcon from '@mui/icons-material/Circle';

// icons
const icons = {
  WidgetsIcon: <WidgetsIcon />,
  MonitorIcon: <MonitorIcon />,
  FolderIcon: <FolderIcon />,
  CircleIcon: <CircleIcon sx={{ fontSize: 10, marginTop: 0.3 }} />,
};

const root = {
  id: 'main',
  title: 'Main',
  type: 'group',
  children: [
    {
      id: 'packing',
      title: 'Packing',
      type: 'item',
      url: '/packing',
      icon: icons.WidgetsIcon,
      breadcrumbs: false,
    },
    /* {
      id: 'monitor',
      title: 'Monitor',
      type: 'item',
      url: '/monitor',
      icon: icons.MonitorIcon,
      breadcrumbs: false,
    },  */
    {
      id: 'master',
      title: 'Master',
      type: 'sub',
      icon: icons.FolderIcon,
      children: [
        {
          id: 'silo',
          title: 'Silo',
          type: 'item',
          url: '/master/silo',
          icon: icons.CircleIcon,
          breadcrumbs: false,
        },
        {
          id: 'grade',
          title: 'Grade',
          type: 'item',
          url: '/master/grade',
          icon: icons.CircleIcon,
          breadcrumbs: false,
        },
        {
          id: 'pallet',
          title: 'Pallet',
          type: 'item',
          url: '/budget/pallet',
          icon: icons.CircleIcon,
          breadcrumbs: false,
        },
      ],
    },
   
  ],
};

export default root;

import React, { useState } from 'react';
import { Tabs, List, Avatar, Badge } from 'antd';

const { TabPane } = Tabs;

const notifications = [
  { id: 1, title: "New Message", message: "You have a pending transaction to review.", time: "23 minutes ago", icon: "https://via.placeholder.com/40" },
  { id: 2, title: "System Update", message: "System update available.", time: "45 minutes ago", icon: "https://via.placeholder.com/40" },
];

const NotificationSection = () => {
  const [newNotifications, setNewNotifications] = useState(notifications);
  const [notificationHistory, setNotificationHistory] = useState([]);

  const handleTabChange = (key) => {
    if (key === "2") {
      setNotificationHistory([...notificationHistory, ...newNotifications]);
      setNewNotifications([]);
    }
  };

  return (
    <div style={{ padding: 24, background: '#fff' }}>
      <Tabs defaultActiveKey="1" onChange={handleTabChange}>
        <TabPane tab={
          <Badge count={newNotifications.length} offset={[10, 0]}>
            New Notifications
          </Badge>
        } key="1">
          <List
            itemLayout="horizontal"
            dataSource={newNotifications}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.icon} />}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <a href="https://ant.design">{item.title}</a>
                      <small>{item.time}</small>
                    </div>
                  }
                  description={<p>{item.message}</p>}
                />
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Notification History" key="2">
          <List
            itemLayout="horizontal"
            dataSource={notificationHistory}
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.icon} />}
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <a href="https://ant.design">{item.title}</a>
                      <small>{item.time}</small>
                    </div>
                  }
                  description={<p>{item.message}</p>}
                />
              </List.Item>
            )}
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default NotificationSection;

import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [],
  }),

  getters: {
    notificationById: (state) => (id) => state.notifications.find(n => n.id === id),
  },

  actions: {
    addNotification(notification) {
      this.notifications.unshift(notification);
    },
    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id);
    },
    clearNotifications() {
      this.notifications = [];
    },
  },
});

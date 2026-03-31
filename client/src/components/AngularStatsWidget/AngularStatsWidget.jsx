import { useEffect, useRef } from 'react'
import angular from 'angular'
import './AngularStatsWidget.css'

const statsModule = angular.module('statsWidget', [])

statsModule.controller('StatsController', ['$scope', '$interval', function($scope, $interval) {
  $scope.stats = {
    totalDeliveries: 2847,
    activeRunners: 23,
    avgDeliveryTime: 18,
    campusCoverage: 95
  }
  
  const animateValue = (start, end, duration, callback) => {
    const startTime = performance.now()
    const update = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (end - start) * easeOutQuart)
      callback(current)
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    requestAnimationFrame(update)
  }
  
  $scope.refreshStats = () => {
    $scope.isRefreshing = true
    
    setTimeout(() => {
      const newStats = {
        totalDeliveries: $scope.stats.totalDeliveries + Math.floor(Math.random() * 20),
        activeRunners: Math.floor(Math.random() * 15) + 15,
        avgDeliveryTime: Math.floor(Math.random() * 10) + 15,
        campusCoverage: Math.min(100, $scope.stats.campusCoverage + Math.floor(Math.random() * 3))
      }
      
      animateValue($scope.stats.totalDeliveries, newStats.totalDeliveries, 1000, (val) => {
        $scope.$apply(() => { $scope.stats.totalDeliveries = val })
      })
      animateValue($scope.stats.activeRunners, newStats.activeRunners, 800, (val) => {
        $scope.$apply(() => { $scope.stats.activeRunners = val })
      })
      animateValue($scope.stats.avgDeliveryTime, newStats.avgDeliveryTime, 600, (val) => {
        $scope.$apply(() => { $scope.stats.avgDeliveryTime = val })
      })
      animateValue($scope.stats.campusCoverage, newStats.campusCoverage, 900, (val) => {
        $scope.$apply(() => { $scope.stats.campusCoverage = val })
      })
      
      $scope.$apply(() => { $scope.isRefreshing = false })
    }, 500)
  }
  
  const autoRefresh = $interval(() => {
    $scope.refreshStats()
  }, 30000)
  
  $scope.$on('$destroy', () => {
    $interval.cancel(autoRefresh)
  })
}])

const AngularStatsWidget = () => {
  const containerRef = useRef(null)
  const initializedRef = useRef(false)
  
  useEffect(() => {
    if (containerRef.current && !initializedRef.current) {
      initializedRef.current = true
      const element = containerRef.current
      angular.bootstrap(element, ['statsWidget'])
    }
    
    return () => {
      initializedRef.current = false
    }
  }, [])
  
  return (
    <div 
      ref={containerRef} 
      className="angular-stats-widget"
      ng-controller="StatsController"
    >
      <div className="stats-header">
        <h3 className="stats-title">Live Platform Stats</h3>
        <button 
          className="stats-refresh-btn"
          ng-click="refreshStats()"
          ng-disabled="isRefreshing"
        >
          <span ng-show="!isRefreshing">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
          </span>
          <span ng-show="isRefreshing" className="stats-spinner"></span>
        </button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value" ng-bind="stats.totalDeliveries | number"></div>
          <div className="stat-label">Deliveries Completed</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value" ng-bind="stats.activeRunners"></div>
          <div className="stat-label">Active Runners</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">
            <span ng-bind="stats.avgDeliveryTime"></span>
            <span className="stat-unit">min</span>
          </div>
          <div className="stat-label">Avg Delivery Time</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">
            <span ng-bind="stats.campusCoverage"></span>
            <span className="stat-unit">%</span>
          </div>
          <div className="stat-label">Campus Coverage</div>
        </div>
      </div>
    </div>
  )
}

export default AngularStatsWidget
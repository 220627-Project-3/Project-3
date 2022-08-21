package com.revature;

import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableCaching
class CachingConfig {

	@Bean
	CacheManager cacheManager() {
		String[] cacheNames = { "productimages" };
		return new ConcurrentMapCacheManager(cacheNames);
	}
}

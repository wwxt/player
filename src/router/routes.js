import routesComponent from './routesComponent.js'

export default[
	{
		path: '/',
		name: 'Main',
		component:routesComponent.Main,
			
		children:[
			{
				path: '/index',
				name: 'Index',
				component:routesComponent.Index
			},
			{
				path: '/discover',
				name: 'Discover',
				component:routesComponent.Discover
			},
			{
				path: '/my',
				name: 'My',
				component:routesComponent.My
			},
		]
	},
	
	{
		path: '/details/:pid',
		name: 'Details',
		component:routesComponent.Details,
	},
	{
		path: '/classification/:pid',
		name: 'Classification',
		component:routesComponent.Classification,
	},
	{
		path: '/classifdata/:pid',
		name: 'Classifdata',
		component:routesComponent.Classifdata,
	},
	{
		path: '/ranking/:pid',
		name: 'Ranking',
		component:routesComponent.Ranking,
	},
	{
		path: '/titledata/:pid',
		name: 'Titledata',
		component:routesComponent.Titledata,
	},
	{
		path: '/lovedata/:pid',
		name: 'Lovedata',
		component:routesComponent.Lovedata,
	},
	{
		path: '/rankingdata/:pid/:are',
		name: 'Rankingdata',
		component:routesComponent.Rankingdata,
	},
	{
		path: '/search',
		name: 'Search',
		component:routesComponent.Search,
	},
	{
		path: '/login',
		name: 'Login',
		component:routesComponent.Login,
	},
	{
		path: '/love',
		name: 'Love',
		component:routesComponent.Love,
	},
	{
		path: '/attention',
		name: 'Attention',
		component:routesComponent.Attention,
	},
]

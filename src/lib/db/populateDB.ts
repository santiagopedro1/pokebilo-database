import { db, pokemon, pokemonSpecies, pokemonType } from './index';

import Pokedex from 'pokedex-promise-v2';

export const populateDatabasePokemon = async () => {
	const P = new Pokedex();

	const maxPokemon = 151;

	for (let i = 1; i <= maxPokemon; i++) {
		const species = await P.getPokemonSpeciesByName(i);

		await db.insert(pokemonSpecies).values({
			pokedexNumber: i,
			name: species.names.find((n) => n.language.name === 'en')!.name.toLowerCase(),
			category: species.genera.find((g) => g.language.name === 'en')!.genus.toLowerCase()
		});

		console.log(`\n\nInserted species ${species.name}`);

		for (const item of species.varieties) {
			// skip the bullshit pikachu forms
			if (i === 25 && item.pokemon.name !== 'pikachu' && item.pokemon.name !== 'pikachu-gmax') {
				continue;
			}

			let tauros = '';

			if (i === 128) {
				if (item.pokemon.name === 'tauros-paldea-combat-breed') tauros = 'paldean tauros (combat breed)';
				if (item.pokemon.name === 'tauros-paldea-blaze-breed') tauros = 'paldean tauros (blaze breed)';
				if (item.pokemon.name === 'tauros-paldea-aqua-breed') tauros = 'paldean tauros (aqua breed)';
			}

			const pokemonF = await P.getPokemonByName(item.pokemon.name);
			const form = await P.getPokemonFormByName(item.pokemon.name);

			const id = form.id;
			const speciesId = i;
			const isDefault = item.is_default;
			const displayName = tauros
				? tauros
				: isDefault
					? species.names.find((n) => n.language.name === 'en')!.name.toLowerCase()
					: form.names.find((n) => n.language.name === 'en')!.name.toLowerCase();
			const formName = item.pokemon.name;
			const height = pokemonF.height;
			const weight = pokemonF.weight;
			const type1 = parseInt(pokemonF.types[0].type.url.split('/').slice(-2)[0]);
			const type2 = pokemonF.types[1] ? parseInt(pokemonF.types[1].type.url.split('/').slice(-2)[0]) : null;
			const stats = [
				{ name: 'HP', baseStat: pokemonF.stats[0].base_stat, evYield: pokemonF.stats[0].effort },
				{ name: 'Attack', baseStat: pokemonF.stats[1].base_stat, evYield: pokemonF.stats[1].effort },
				{ name: 'Defense', baseStat: pokemonF.stats[2].base_stat, evYield: pokemonF.stats[2].effort },
				{ name: 'Sp. Attack', baseStat: pokemonF.stats[3].base_stat, evYield: pokemonF.stats[3].effort },
				{ name: 'Sp. Defense', baseStat: pokemonF.stats[4].base_stat, evYield: pokemonF.stats[4].effort },
				{ name: 'Speed', baseStat: pokemonF.stats[5].base_stat, evYield: pokemonF.stats[5].effort }
			];
			const defaultImageUrl = pokemonF.sprites.other['official-artwork'].front_default!;
			const shinyImageUrl = pokemonF.sprites.other['official-artwork'].front_shiny!;

			try {
				await db.insert(pokemon).values({
					id,
					speciesId,
					displayName,
					formName,
					height,
					weight,
					isDefault,
					type1,
					type2,
					stats,
					defaultImageUrl,
					shinyImageUrl
				});
				console.log(`Inserted form ${item.pokemon.name}`);
			} catch (error) {
				console.error(error);
			}
		}
	}
};

const urls = [
	'https://archives.bulbagarden.net/media/upload/thumb/a/ae/Normal_icon.png/40px-Normal_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/7/7d/Fighting_icon.png/40px-Fighting_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/f/f0/Flying_icon.png/40px-Flying_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/8/84/Poison_icon.png/40px-Poison_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/5/58/Ground_icon.png/40px-Ground_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/f/ff/Rock_icon.png/40px-Rock_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/7/79/Bug_icon.png/40px-Bug_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/8/82/Ghost_icon.png/40px-Ghost_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/b/b8/Steel_icon.png/40px-Steel_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/5/5e/Fire_icon.png/40px-Fire_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/7/7f/Water_icon.png/40px-Water_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/c/cb/Grass_icon.png/40px-Grass_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/a/af/Electric_icon.png/40px-Electric_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/a/a6/Psychic_icon.png/40px-Psychic_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/8/83/Ice_icon.png/40px-Ice_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/9/91/Dragon_icon.png/40px-Dragon_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/3/33/Dark_icon.png/40px-Dark_icon.png',
	'https://archives.bulbagarden.net/media/upload/thumb/5/5a/Fairy_icon.png/40px-Fairy_icon.png'
];

export const populateDatabaseTypes = async () => {
	const p = new Pokedex();
	const allTypes: any[] = [];
	for (let i = 1; i <= 18; i++) {
		const type = await p.getTypeByName(i);
		const resists = type.damage_relations.half_damage_from.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const weak = type.damage_relations.double_damage_from.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const immune = type.damage_relations.no_damage_from.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const halfDamageTo = type.damage_relations.half_damage_to.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const doubleDamageTo = type.damage_relations.double_damage_to.map((t) => parseInt(t.url.split('/').slice(-2)[0]));
		const noDamageTo = type.damage_relations.no_damage_to.map((t) => parseInt(t.url.split('/').slice(-2)[0]));

		allTypes.push({
			id: i,
			name: type.name,
			iconUrl: urls[i - 1],
			damageRelations: {
				offensive: {
					halfDamageTo,
					doubleDamageTo,
					noDamageTo
				},
				defensive: {
					resists,
					weak,
					immune
				}
			}
		});
	}
	await db.insert(pokemonType).values(allTypes);
};


// basic select usage
db.table('customers').get();					// return all rows
db.table('customers').get('id, name');			// column's defined as string
db.table('customers').get(['id', 'name']);		// column's defined as array of strings
db.table('customers').get({id: 0, name: 0]});	// column's defined as properties on object (value's are irrelevant)


// basic insert
db.table('users').insert({id: 121, name: 'matito'});	// return's the id of the inserted record
// bulk insert
var valueArr = [{id: 121, name: 'matito'}, {id: 213, name: 'sheep'}];
db.table('users').insert(valueArr);


// basic updates
db.table('users').where({id: 121}).update({name: 'matito'});	// updates property name where id = 121


// basic deletions
db.table('users').where({id: 121}).delete();	// delete's row where id = 121
.orWhere({id: 213})
.whereBetween('id', 100, 230)
.whereNotBetween()
.whereIn('id', [12, 23, 45])
.whereNotIn('id', [12, 23, 45])
.whereNull('id')
.whereNotNull('id')

// complex where clause
var subQueryDefinition = db.table('blah').where({'id': 123});	// Note no 'get'
.whereExists(subQueryDefinition)


// truncate - [bypasses DML constraints, removes and recreates table]
db.table('test').truncate();


// where clauses 													TODO: OR clause, IN clause
db.table('test').where({id: 121}).get();
db.table('test').where({id: 121, name: 'matito'}).get();
db.table('test').where({id: 121}).get();


// orderby clause	[note - orderby will always run before limit and offset clauses]
db.table('grades').orderby('score').get();			// orderby score col [default: asc]
db.table('grades').orderby('score', 'desc').get();	// orderby score col descending
db.table('grades').orderby('score', 'desc').orderby('time', 'asc').get();	// orderby score col descending then time asceding


// limit and offset's
db.table('test').limit(100).get();		// simple limit to 100 rows
db.table('test').limit(100, 30).get();		// limit to 100 rows, starting at offset 30
db.table('test').limit(null, 30).get();		// all rows starting at offset 30 (null can be any falsy parameter i.e. 0, '', false, undefined)


// group by
db.table('test').groupby('category').get();


// distinct
db.table('test').distinct().get();	// adds distinct clause to query


// aggregates - can be used with 
db.table('test').count();		// count rows that match query
db.table('test').sum('age');	// sums col
db.table('test').max('age');	// max value found in age
db.table('test').min('age');	// min value found in age
db.table('test').avg('age');	// average of age column


// join's
db.table('test').join('blah', 'blah.id', '=', 'test.id').where({id: 123}).get();			// inner join
db.table('test').leftJoin('blah', 'blah.id', '=', 'test.id').where('id', '>', 110}).get();	// left join


// union
var subQuery = db.table('blah').where('id', '>', 123);	// Note no 'get'
db.table('test').where('id', '>', 15).union(subQuery).get();


// stored procedures
db.sp('SP_name_here').exec();						// calls the stored procedure 'SP_name_here'
db.sp('SP_name_here').exec(paramOne, paramTwo);		// calls the stored procedure with the paramaters provided



// db schema

// creating tables
var id = {name: 'id', type: 'INT', flags: 'AUTO_INCREMENT'};
var two = {name: 'two', type: 'CHAR(30)'};
var three = {name: 'three', type: 'TEXT'};
schema.create('table_name').columns(id, two, three);

schema.create('table_name').columns(id, two, three).engine('InnoDB');	// specify engine

// rename table
schema.rename('blah', 'test');

// drop table
schema.drop('test');

// adding columns
var four = {name: 'four', type: 'TEXT'};
schema.table('test').columns(four);

//rename column
schema.table('test').renameColumn('two', 'name');

// remove column
schema.table('test').dropColumn('name');

// index 				-  return index name upon creation
schema.table('test').index('three');
schema.table('test').index('three', 'index_three_name');
schema.table('test').index(['three', 'four']);

// unique
schema.table('test').unique('three');

// primary index
schema.table('test').unique('id');


dropPrimary

dropUnique

dropIndex


// foreign key
schema.table('test').foreign('user_id').references('id').on('users');

onDelete ??

// drop foreign key constraint
schema.table('test').dropForeign('index_name');
/**
 * @author mrdoob / http://mrdoob.com/
 */

THREE.GeometryUtils = {

	merge: function ( geometry1, geometry2, materialIndexOffset ) {

		console.warn( 'THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.' );

		var matrix;

		if ( geometry2 instanceof THREE.Mesh ) {

			geometry2.matrixAutoUpdate && geometry2.updateMatrix();

			matrix = geometry2.matrix;
			geometry2 = geometry2.geometry;

		}

		geometry1.merge( geometry2, matrix, materialIndexOffset );

	},

	center: function ( geometry ) {

		console.warn( 'THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.' );
		return geometry.center();

	}

	calculateVolumeOfGeometry: function	( geometry ){
		var vols = 0;

		function SingedVolumeOfTriangle(p1, p2, p3) {
			var v321 = p3.x * p2.y * p1.z;
			var v231 = p2.x * p3.y * p1.z;
			var v312 = p3.x * p1.y * p2.z;
			var v132 = p1.x * p3.y * p2.z;
			var v213 = p2.x * p1.y * p3.z;
			var v123 = p1.x * p2.y * p3.z;

			return (1.0 / 6.0) * (-v321 + v231 + v312 - v132 - v213 + v123);

		}

		for(i = 0; i < geometry.faces.length; i++) {

			var a = geometry.faces[i].a;
			var b = geometry.faces[i].b;
			var c = geometry.faces[i].c;

			var p1 = geometry.vertiecs[a];
			var p2 = geometry.vertiecs[b];
			var p3 = geometry.vertiecs[c];

			vols += SingedVolumeOfTriangle(p1, p2, p3);

		}

		return vols;
	}

};

module JekyllImport

  module Importers

    class Columbus < Importer

      def self.require_deps

        JekyllImport.require_with_fallback(%w(

          safe_yaml

          mysql2

        ))

      end

      def self.specify_options(c)

        c.option "dbname",   "--dbname DB",   "Database name (default: '')"

        c.option "user",     "--user USER",   "Database user name (default: '')"

        c.option "password", "--password PW", "Database user's password (default: '')"

        c.option "host",     "--host HOST",   "Database host name (default: 'localhost')"

      end

      def self.process(opts)

        options = {

          :dbname   => opts.fetch("dbname", ""),

          :user     => opts.fetch("user", ""),

          :password => opts.fetch("password", ""),

          :host     => opts.fetch("host", "")

        }

        # Do the magic!

      end

    end

  end

end
